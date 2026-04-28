jest.setTimeout(15000);

const { execSync } = require("child_process");

const CONTAINER_NAME = "calculatrice";
const URL = "http://localhost:6969";

function run(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8" }).trim();
  } catch (e) {
    return "";
  }
}

function parseMemoryToMb(memString) {
  const value = parseFloat(memString);
  const unit = memString.replace(/[0-9.]/g, "").trim();

  if (unit === "KiB") return value / 1024;
  if (unit === "MiB") return value;
  if (unit === "GiB") return value * 1024;

  return value;
}

test("le conteneur existe et tourne", () => {
  const status = run(`docker inspect -f '{{.State.Running}}' ${CONTAINER_NAME}`);
  expect(status).toBe("true");
});

test("nginx répond en HTTP 200", () => {
  const code = run(`curl -s -o /dev/null -w "%{http_code}" ${URL}`);
  expect(code).toBe("200");
});

test("uptime > 10 secondes", () => {
  const startedAt = run(`docker inspect -f '{{.State.StartedAt}}' ${CONTAINER_NAME}`);

  const start = new Date(startedAt).getTime();
  const now = Date.now();

  const uptime = (now - start) / 1000;

  expect(uptime).toBeGreaterThan(10);
});

test("mémoire < 100 MB", () => {
  const mem = run(`docker stats ${CONTAINER_NAME} --no-stream --format "{{.MemUsage}}"`);

  const used = mem.split("/")[0].trim();
  const mb = parseMemoryToMb(used);

  expect(mb).toBeLessThan(100);
});

test("CPU < 20%", () => {
  const cpu = run(`docker stats ${CONTAINER_NAME} --no-stream --format "{{.CPUPerc}}"`);

  const percent = parseFloat(cpu.replace("%", ""));

  expect(percent).toBeLessThan(20);
});

test("pas de fuite mémoire visible (5 mesures)", async () => {
  const values = [];

  for (let i = 0; i < 5; i++) {
    const mem = run(`docker stats ${CONTAINER_NAME} --no-stream --format "{{.MemUsage}}"`);
    const used = mem.split("/")[0].trim();
    const mb = parseMemoryToMb(used);

    values.push(mb);

    await new Promise(r => setTimeout(r, 1000));
  }

  const diff = values[values.length - 1] - values[0];

  expect(diff).toBeLessThan(20);
});

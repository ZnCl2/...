import subprocess
import time

start = time.time()

while time.time() < start + 30 * 60:
	subprocess.run(["python", "backend/handle.py"])
	time.sleep(5)
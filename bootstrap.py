#!/usr/bin/env python

# Gets necessary libraries and packages that allow to get and build the Deer
# project properly.

import subprocess, signal, sys

# Ignores ctrl-c.
def signal_handler(signal, frame):
	sys.exit(0)


# Executes a command (cmd) in the shell and gets real time output in the
# standard output.
# Reference (https://www.cyberciti.biz/faq/python-execute-unix-linux-command-examples/)
def execute_command(cmd):
	process = subprocess.Popen(cmd, shell=True, stderr=subprocess.PIPE)
	while True:
		out = process.stderr.read(1)
		if out == '' and process.poll() != None:
			break
		if out != '':
			sys.stdout.write(out)
			sys.stdout.flush()

def main():
	# Get packages.
	execute_command("sudo apt-get install git cmake libgtk-3-dev build-essential \
  										 doxygen")
  
if __name__== "__main__":
	# Catch the KeyboardInterrupt exception(SIGINT).
	signal.signal(signal.SIGINT, signal_handler)

	main()
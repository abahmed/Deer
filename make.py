#!/usr/bin/env python

# Responsible for performing main commands (e.g. building, cleaning, installing,
# etc.) in Deer project in behalf of the user to keep these commands simple.

import subprocess, signal, sys, shutil, os

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

def remove_path(path):
	print ("Trying to remove {}".format(path))
	if not os.path.exists(path):
		print ("Warning: {} does not exist.".format(path))
		return
	shutil.rmtree(path)

def print_usage():
	print ("Usage: make.py <command>")	

def main():
	# Check argument if it is passed properly.
	if not len(sys.argv) == 2:
		print_usage()
		sys.exit(0)
	
	# Get argument and handle it.
	command = sys.argv[1]
	if command == 'build':
		print("Building project...")
		execute_command("mkdir build; cd build; cmake ..; make")
		pass
	elif command == 'run':
		print("Running project...")
		executable = "./build/bin/Deer"
		if not os.path.exists(executable):
			print ("Error: Executable program does not exist")
		else:
			execute_command(executable)
	elif command == 'clean':
		print("Cleaning project...")
		remove_path("build")
		pass
	elif command == '--help':
		print_usage()
		print ("This is a list of supported commands:")
		print ("    build\tBuilds Deer project.")
		print ("    clean\tRemove existing build")
		print ("    run\tRuns project after building it.")
	else:
		# This argument is not matched.
		print ("make.py: '{}' is not a make command. See 'make.py --help'.".format(command))
  

if __name__== "__main__":
	# Catch the KeyboardInterrupt exception(SIGINT).
	signal.signal(signal.SIGINT, signal_handler)
	
	main()
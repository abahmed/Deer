#!/usr/bin/env python

# Responsible for performing main commands (e.g. building, cleaning, installing,
# etc.) in Deer project in behalf of the user to keep these commands simple.

import subprocess, sys, shutil, os, multiprocessing

# Executes a command (cmd) in the shell and gets real time output in the
# standard output.
# Reference (https://www.cyberciti.biz/faq/python-execute-unix-linux-command-examples/)
def execute_command(cmd):
	process = subprocess.Popen(cmd, shell=True, stderr=subprocess.PIPE)
	while True:
		out = process.stderr.read(1)
		exit_code = process.poll()
		if out == '' and exit_code != None:
			exit(exit_code)
		if out != '':
			sys.stdout.write(out)
			sys.stdout.flush()

# Deletes specified path if it's a file or directory and prints warning if the
# provided path does not exist.
def remove_path(path):
	print ("Trying to remove {}".format(path))
	if not os.path.exists(path):
		print ("Warning: {} does not exist.".format(path))
		return
	shutil.rmtree(path)

# Cleans all previous builds.
def clean_build():
	remove_path("build")
	remove_path("build_test")

# Prints usage of this script.
def print_usage():
	print ("Usage: make.py <command>")	

def print_help():
	print_usage()
	print ("This is a list of supported commands:")
	print ("    build\t\tBuilds Deer project.")
	print ("    clean\t\tRemove existing build")
	print ("    run  \t\tRuns project after building it.")
	print ("    test\t\tBuilds tests of Deer project.")
	print ("    run-test\t\tRuns tests after building it.")
	print ("    add-test NAME\tAdds a template of a new test.")

def main():
	# Check argument if it is passed properly.
	if len(sys.argv) < 2:
		print_usage()
		sys.exit(0)

	# Get number of jobs that will be used for building.	
	num_jobs = multiprocessing.cpu_count() + 2

	# Get argument and handle it.
	command = sys.argv[1]
	if command == 'build':
		print("Building project...")
		execute_command("mkdir build; cd build; cmake ..; make -j" + 
				str(num_jobs))
	elif command == 'run':
		print("Running project...")
		executable = "build/bin/Deer"
		if not os.path.exists(executable):
			raise ValueError("Error: Executable program does not exist")
		execute_command("cd build/bin; ./Deer")
	elif command == 'clean':
		print("Cleaning project...")
		clean_build()
	elif command == 'test':
		print("Building tests...")
		execute_command("mkdir build_test; cd build_test; \
				 cmake -Dtest=ON ..; make -j" + str(num_jobs))
	elif command == 'run-test':
		print("Running test...")
		test_dir = "build_test"
		if not os.path.exists(test_dir):
			raise ValueError("Error: Test directory does not exist")
		execute_command("cd build_test; make test")
	elif command == 'new-test':
		if len(sys.argv) != 3:
			print_help()
			exit(0)
		test_name = "test_" + sys.argv[2]
		test_dir = "test/" + test_name
		if os.path.exists(test_dir):
			raise ValueError("Error: This test is already existing.")
		
		# Create testing directory		
		execute_command("cd test; mkdir " + test_name)
	
		# Adding test to CMakeList.txt
		execute_command("cd test; echo 'add_subdirectory(" + test_name +
				")' >> CMakeLists.txt")
		# Generate template files
		execute_command("cd " + test_dir + "; echo '" +
		"add_executable(run_" + test_name + " " + test_name + ".cpp)\n\n" +
		"# Standard linking to gtest stuff.\n" +
		"target_link_libraries(run_" + test_name + " gtest gtest_main)\n\n" +
		"# This is so you can do 'make test' to see all tests run.\n" +
		"add_test(NAME " + test_name + " COMMAND run_" + test_name + 
		")' > CMakeLists.txt")
		execute_command("cd " + test_dir + "; echo '" +
		"#include \"gtest/gtest.h\"' > " + test_name + ".cpp")	
	elif command == '--help':
		print_help()
	else:
		# This argument is not matched.
		print ("make.py: '{}' is not a make command. See 'make.py " +
		       "--help'.".format(command))
  

if __name__== "__main__":
	main()

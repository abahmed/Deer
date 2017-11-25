# Set minimum version to 3.0 as it's needed for building glog library.
cmake_minimum_required(VERSION 3.0)

# Set project name
project (Deer)

# Set the version number
set (VERSION_MAJOR 0)
set (VERSION_MINOR 0)
set (VERSION_PATCH 1)
set(VERSION ${VERSION_MAJOR}.${VERSION_MINOR}.${VERSION_PATCH})

# Set output directories
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib") 
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")

# Set flags for C++ compiler
set(CMAKE_CXX_FLAGS "-Wall")

# Use the package PkgConfig to detect libraries
FIND_PACKAGE(PkgConfig REQUIRED)

# This adds another subdirectory, which has 'project(gtest)'.
# Adding glog library and disable testing and gflags options.
SET(WITH_GFLAGS OFF CACHE BOOL "Disable GFLAGS")
SET(BUILD_TESTING OFF CACHE BOOL "Disable TESTING")
add_subdirectory(third_party/glog)

if (test)
  # If testing flag is provided, add gtest library and include testing
  # directory.
  add_subdirectory(third_party/googletest/googletest)
  enable_testing()
  add_subdirectory(test)
else()
  # Perform normal build if testing flag is not provided.
  add_subdirectory(src)
endif()

# Set minimum version to 2.8
cmake_minimum_required(VERSION 2.8)

# Set project name
project (Deer)

# Set the version number
set (VERSION_MAJOR 0)
set (VERSION_MINOR 0)
set (VERSION_PATCH 1)
set(VERSION ${VERSION_MAJOR}.${VERSION_MINOR}.${VERSION_PATCH})

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib") 
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/lib")


# Use the package PkgConfig to detect libraries
FIND_PACKAGE(PkgConfig REQUIRED)

# add project's directories
add_subdirectory(src)

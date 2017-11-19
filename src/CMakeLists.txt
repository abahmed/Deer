# Check gtk+3 package
PKG_CHECK_MODULES(GTK3 REQUIRED gtk+-3.0)


# Tell the compiler where to look for headers
INCLUDE_DIRECTORIES(${GTK3_INCLUDE_DIRS})

# Tell the linker where to look for libraries
LINK_DIRECTORIES(${GTK3_LIBRARY_DIRS})

# Add cflags to the compiler
ADD_DEFINITIONS(${GTK3_CFLAGS_OTHER})

# Add an executable compiled from source files
ADD_EXECUTABLE(${CMAKE_PROJECT_NAME} main.cpp)

# Link the target to the GTK+ libraries
TARGET_LINK_LIBRARIES(${CMAKE_PROJECT_NAME} ${GTK3_LIBRARIES})
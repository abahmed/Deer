// Copyright 2017, Deer Project.

#include "deer.h"

// Constructor of deer_app class. It takes arguments that is passed to the
// application.
deer::deer_app::deer_app(int argc, char **argv) {
    // Initialize google log with the application name "Deer".
    google::InitGoogleLogging(argv[0]);
    FLAGS_logtostderr = 1;

    LOG(INFO) << "Initializing Deer application...";
}

// Destructor of deer_app class. Called on quiting the application.
deer::deer_app::~deer_app() {
}

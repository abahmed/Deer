// Copyright 2017, Deer Project.

#include "gui.h"

// Constructor of deer_gui class.
deer::deer_gui::deer_gui() : main_window_ui_path("src/ui/main-window.ui") {
    // Initialize main window.
    LOG(INFO) << "Initializing Deer main window...";
}

// load application window.
void deer::deer_gui::load_gui(int argc, char **argv) {
    LOG(INFO) << "load_gui\n";

    gtk_init(&argc, &argv);

    // load main window ui builder
    builder = gtk_builder_new ();
    gtk_builder_add_from_file(builder, main_window_ui_path, NULL);

    // load window object
    window = gtk_builder_get_object(builder, "window");

    // register destroy handler
    g_signal_connect(window, "destroy", G_CALLBACK(destroy), NULL);

    // wait fot coming events
    gtk_main();
}

// window destroy callback.
void deer::deer_gui::destroy(GtkWidget *widget, gpointer data) {
    LOG(INFO) << "Window destroy called";
    gtk_main_quit();
}

// Destructor of deer_gui class. Called on quiting the window.
deer::deer_gui::~deer_gui() {
    LOG(INFO) << "Gui class destructor called";
}

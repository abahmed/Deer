// Copyright 2017, Deer Project.

#include "gui.h"

// Constructor of deer_gui class.
deer::deer_gui::deer_gui() {
    // Initialize main window.
    LOG(INFO) << "Initializing Deer main window...";
}

// load application window.
void deer::deer_gui::load_gui(int argc, char **argv) {
    LOG(INFO) << "load_gui\n";

    gtk_init(&argc, &argv);

    // create window
    window = gtk_window_new(GTK_WINDOW_TOPLEVEL);

    // register destroy handler
    g_signal_connect(window, "destroy", G_CALLBACK(destroy), NULL);

    // show window
    gtk_widget_show(window);

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

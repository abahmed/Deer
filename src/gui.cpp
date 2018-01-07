// Copyright 2017, Deer Project.

#include "gui.h"

// Create new pixbuf from file
GdkPixbuf* deer::deer_gui::create_pixbuf(const gchar *filename)
{
    GdkPixbuf *pixbuf;
    GError *error = NULL;
    pixbuf = gdk_pixbuf_new_from_file(filename, &error);

    if(!pixbuf)
    {
        fprintf(stderr, "%s\n", error->message);
        g_error_free(error);
    }

    return pixbuf;
}
// Constructor of deer_gui class.
deer::deer_gui::deer_gui()
    : main_window_ui_path("resources/ui/main-window.ui") {
    // Initialize main window.
    LOG(INFO) << "Initializing Deer main window...";
}

// load application window.
void deer::deer_gui::load_gui(int argc, char **argv) {
    LOG(INFO) << "load_gui\n";

    gtk_init(&argc, &argv);

    // load main window ui builder
    builder = gtk_builder_new();
    gtk_builder_add_from_file(builder, main_window_ui_path, NULL);

    // load window object
    window = gtk_builder_get_object(builder, "window");

    // load appication icon
    icon = create_pixbuf("resources/icons/Deer-64.png");
    gtk_window_set_icon(GTK_WINDOW(window), icon);

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

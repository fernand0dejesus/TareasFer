/*
campos:
title
description
completed
*/

import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Elimina espacios en blanco al inicio y al final
    minlength: 3, // Longitud mínima del título
    maxlength: 50, // Longitud máxima del título
  },
  description: {
    type: String,
    required: true,
    minlength: 5, 
    maxlength: 200, 
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {

  strict: false,
  timestamps: true,

});

export default model("Task", taskSchema);
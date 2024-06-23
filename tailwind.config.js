/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// yarn run tailwindcss -i ./static/styles/input.css -o ./static/styles/output.css --watch
// <link rel="stylesheet" type="text/css" href="{{ url_for('static',filename='styles/output.css') }}">
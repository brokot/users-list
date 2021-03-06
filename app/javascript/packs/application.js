// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import ReactOnRails from 'react-on-rails';
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

import UsersApp from '../application/loadables/users_loadable.jsx';

Rails.start();
Turbolinks.start();
ActiveStorage.start();

ReactOnRails.register({
  UsersApp,
});

window.axiosDefaultHeaders = ReactOnRails.authenticityHeaders({'Content-Type': 'application/json' });

// Styles
import '../stylesheets/application.scss';

import _ from 'lodash';
import './style.scss';
import binder from './lib/binder'


function InputController () {
    this.message = 'Hello World!';
}

binder.controller('InputController', InputController);

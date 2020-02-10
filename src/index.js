import _ from 'lodash';
import './style.scss';
import binder from './lib/binder'

function InputController () {
    this.message = 'World yayyy!';
    this.price ='34$'
}

binder.controller('PriceController', InputController);
binder.controller('InputController', InputController);

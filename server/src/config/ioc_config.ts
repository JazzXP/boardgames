import "reflect-metadata";
import { Container } from "inversify";

import SERVICE_IDENTIFIER from '../constants';

import IDB from '../interfaces/IDB';
import { DB } from '../data/db';


let container = new Container();

container.bind<IDB>(SERVICE_IDENTIFIER.DB).toConstantValue(new DB());

export default container;

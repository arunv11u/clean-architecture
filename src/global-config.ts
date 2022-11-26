import { DAOFactoryImpl, HelperFactoryImpl, MiddlewareFactoryImpl, PipeFactoryImpl, RepositoryFactoryImpl, ServiceFactoryImpl, ValidationFactoryImpl } from "./utils";


const helperFactory = new HelperFactoryImpl();
const middlewareFactory = new MiddlewareFactoryImpl();
const pipeFactory = new PipeFactoryImpl();
const serviceFactory = new ServiceFactoryImpl();
const validationFactory = new ValidationFactoryImpl();
const daoFactory = new DAOFactoryImpl();
const repositoryFactory = new RepositoryFactoryImpl();


export {
    helperFactory,
    middlewareFactory,
    pipeFactory,
    serviceFactory,
    validationFactory,
    daoFactory,
    repositoryFactory
};

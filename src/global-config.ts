import { DAOFactory, HelperFactory, MiddlewareFactory, PipeFactory, RepositoryFactory, ServiceFactory, ValidationFactory } from "./utils";


const helperFactory = HelperFactory.getInstance();
const middlewareFactory = MiddlewareFactory.getInstance();
const pipeFactory = PipeFactory.getInstance();
const serviceFactory = ServiceFactory.getInstance();
const validationFactory = ValidationFactory.getInstance();
const daoFactory = DAOFactory.getInstance();
const repositoryFactory = RepositoryFactory.getInstance();

export {
    helperFactory,
    middlewareFactory,
    pipeFactory,
    serviceFactory,
    validationFactory,
    daoFactory,
    repositoryFactory
};

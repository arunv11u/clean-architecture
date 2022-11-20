import { HelperFactory, MiddlewareFactory, PipeFactory, ServiceFactory, ValidationFactory } from "./utils";


const helperFactory = HelperFactory.getInstance();
const middlewareFactory = MiddlewareFactory.getInstance();
const pipeFactory = PipeFactory.getInstance();
const serviceFactory = ServiceFactory.getInstance();
const validationFactory = ValidationFactory.getInstance();

export {
    helperFactory,
    middlewareFactory,
    pipeFactory,
    serviceFactory,
    validationFactory
};

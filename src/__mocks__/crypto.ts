import Crypto from "crypto";

var crypto: typeof Crypto = jest.createMockFromModule("crypto");


export = crypto;

import path from 'path';

const mergePath = (paths: string[]) => {
    path.join(...paths);
};

export {
    mergePath
};

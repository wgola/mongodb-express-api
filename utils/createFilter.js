const createFilter = (query) => {
  const splitByColon = (input) => {
    const splitted = input.split(":");
    if (splitted.length === 1) {
      const ifBoolean = input === "true" || input === "false";
      return { key: null, value: ifBoolean ? input === "true" : input };
    } else {
      const key = `$${splitted[0]}`;
      const value = splitted[1];
      return { key, value };
    }
  };

  const filter = Object.keys(query).reduce((object, nextKey) => {
    const tmpQuery = query[nextKey];
    const splittedByComa = tmpQuery.split(",");
    if (splittedByComa.length === 1) {
      const { key, value } = splitByColon(tmpQuery);
      key === null
        ? (object[nextKey] = value)
        : (object[nextKey] = { [key]: parseInt(value) });
    } else {
      if (splittedByComa[0].split(":").length === 1) {
        object[nextKey] = { $in: [...splittedByComa] };
      } else {
        const tmpObject = splittedByComa.reduce((obj, elem) => {
          const { key, value } = splitByColon(elem);
          obj[key] = parseInt(value);
          return obj;
        }, {});
        object[nextKey] = tmpObject;
      }
    }

    return object;
  }, {});

  return filter;
};

module.exports = { createFilter };

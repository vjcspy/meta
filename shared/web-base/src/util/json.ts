export const json = {
  unserialize: (string: string) => {
    try {
      return JSON.parse(string);
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  serialize: (data: any) => {
    return JSON.stringify(data);
  },
};

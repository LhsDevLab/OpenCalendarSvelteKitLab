const FetchStore = {
  accessToken: "",
  refreshToken: "",
};

function setToken(newToken: { accessToken?: string; refreshToken?: string }) {
  Object.assign(FetchStore, newToken);
}

export { FetchStore, setToken };

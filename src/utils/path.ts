export function currentPath(path: string): string {
  switch (path) {
    case "/user":
      return "USER";
    case "/pools/fox":
      return "FOX";
    case "/pools/owl":
      return "OWL";
    case "/pools/wolf":
      return "WOLF";
  }
}

toto @1.x
  => truc @1.x
tata @1.x
  => truc @2.x

toto.php => class Toto
tata.php => class Tata
truc.php => class Truc × 2

Solution NPM:
/*
node_modules
  express → require("debug") // 2.6.9 => ../node_modules/debug
    node_modules
      toto
      tata
  debug // 2.6.9
  @babel
    core → require("debug") // 4.6.4 => ./node_modules/debug
      node_modules
        debug // 4.6.4
*/

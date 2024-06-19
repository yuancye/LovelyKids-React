CREATE TABLE IF NOT EXISTS User (
  username VARCHAR(32) NOT NULL,
  PRIMARY KEY(username)
);

CREATE TABLE IF NOT EXISTS Kids (
  kids_name VARCHAR(32) NOT NULL,
  username VARCHAR(32) NOT NULL,
  icon TEXT,
  scores INT DEFAULT 0,
  PRIMARY KEY (username, kids_name),
  FOREIGN KEY(username) REFERENCES User(username)
);

CREATE TABLE IF NOT EXISTS RulesCategory (
  category_name VARCHAR(32) NOT NULL,
  PRIMARY KEY(category_name)
);

CREATE TABLE IF NOT EXISTS Rules (
  username VARCHAR(32) NOT NULL,
  kids_name VARCHAR(32) NOT NULL,
  rule_name TEXT NOT NULL,
  rule_category VARCHAR(32) NOT NULL,
  PRIMARY KEY (username, kids_name, rule_category, rule_name),
  FOREIGN KEY(username) REFERENCES User(username),
  FOREIGN KEY(kids_name) REFERENCES Kids(kids_name),
  FOREIGN KEY(rule_category ) REFERENCES RulesCategory(category_name)
);
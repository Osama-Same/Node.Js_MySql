CREATE DATABASE shopping
CREATE TABLE
    users (
        id INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        cloudinary_id VARCHAR(255) NOT NULL,
        authorization VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    );

CREATE TABLE
    contact (
        id INT AUTO_INCREMENT NOT NULL,
        email VARCHAR(255) NOT NULL,
        massage VARCHAR(255) NOT NULL,
        PRIMARY KEY(id)
    )
CREATE TABLE
    news (
        id INT AUTO_INCREMENT NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        PRIMARY KEY(id)
    )
CREATE TABLE
    categories (
        id INT AUTO_INCREMENT NOT NULL,
        parentid INT,
        name VARCHAR (100),
        logo VARCHAR(255),
        cloudinary_id VARCHAR(255) NOT NULL,
        categorytype INT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    products (
        id INT AUTO_INCREMENT NOT NULL,
        iduser INT,
        idcategory INT,
        name VARCHAR(100) NOT NULL,
        country VARCHAR (100) NOT NULL,
        images VARCHAR(255) NOT NULL,
        price DOUBLE(6, 2) NOT NULL,
        date VARCHAR (100) NOT NULL,
        description VARCHAR(255) NOT NULL,
        cloudinary_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (idcategory) REFERENCES categories (id),
        FOREIGN KEY (iduser) REFERENCES users (id),
        PRIMARY KEY (id)
    );

CREATE TABLE
    save (
        id INT AUTO_INCREMENT NOT NULL,
        iduser INT,
        idproduct INT,
        save VARCHAR(100) NOT NULL,
        FOREIGN KEY (iduser) REFERENCES users (id),
        FOREIGN KEY (idproduct) REFERENCES products (id),
        PRIMARY KEY (id)
    );

CREATE TABLE
    likee (
        id INT AUTO_INCREMENT NOT NULL,
        iduser INT,
        idproduct INT,
        likee INT,
        FOREIGN KEY (idproduct) REFERENCES products (id),
        FOREIGN KEY (iduser) REFERENCES users (id),
        PRIMARY KEY (id)
    );

CREATE TABLE
    comment (
        id INT AUTO_INCREMENT NOT NULL,
        iduser INT,
        idproduct INT,
        comment VARCHAR(100) NOT NULL,
        date VARCHAR (100) NOT NULL,
        FOREIGN KEY (idproduct) REFERENCES products (id),
        FOREIGN KEY (iduser) REFERENCES users (id),
        PRIMARY KEY (id)
    );

CREATE TABLE
    orders (
        id INT AUTO_INCREMENT NOT NULL,
        iduser INT,
        idproduct INT,
        quantity INT,
        FOREIGN KEY (idproduct) REFERENCES products (id),
        FOREIGN KEY (iduser) REFERENCES users (id),
        PRIMARY KEY (id)
    );

CREATE TABLE
    checkOut (
        id INT AUTO_INCREMENT NOT NULL,
        iduser INT,
        priceOut DOUBLE(6, 2) NOT NULL,
        CreditCardNumber VARCHAR(100) NOT NULL,
        expMonth VARCHAR (100) NOT NULL,
        cvv VARCHAR (100) NOT NULL,
        FOREIGN KEY (iduser) REFERENCES users (id),
        PRIMARY KEY (id)
    );
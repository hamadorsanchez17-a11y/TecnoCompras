CREATE DATABASE IF NOT EXISTS TecnoCompras;
USE TecnoCompras;

-- Tablas de catálogo 
CREATE TABLE nivel_fidelidad (
    id_nivel            INT AUTO_INCREMENT PRIMARY KEY,
    nombre               VARCHAR(100) NOT NULL,
    porcentaje_descuento DECIMAL(5,2) NOT NULL DEFAULT 0
);

CREATE TABLE rol (
    id_rol   INT AUTO_INCREMENT PRIMARY KEY,
    nombre   VARCHAR(100) NOT NULL
);

CREATE TABLE categoria (
    id_categoria  INT AUTO_INCREMENT PRIMARY KEY,
    nombre         VARCHAR(100) NOT NULL,
    descripcion    VARCHAR(500)
);

CREATE TABLE marca (
    id_marca      INT AUTO_INCREMENT PRIMARY KEY,
    nombre        VARCHAR(100) NOT NULL,
    pais_origen   VARCHAR(100)
);

CREATE TABLE keyword (
    id_keyword  INT AUTO_INCREMENT PRIMARY KEY,
    nombre       VARCHAR(100) NOT NULL
);

CREATE TABLE metodo_pago (
    id_metodo  INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL
);

CREATE TABLE estado_carrito (
    id_estado_carrito  INT AUTO_INCREMENT PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL
);

CREATE TABLE estado_pedido (
    id_estado_pedido  INT AUTO_INCREMENT PRIMARY KEY,
    nombre             VARCHAR(100) NOT NULL
);

CREATE TABLE estado_pago (
    id_estado_pago  INT AUTO_INCREMENT PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL
);

CREATE TABLE estado_garantia (
    id_estado_garantia  INT AUTO_INCREMENT PRIMARY KEY,
    nombre                VARCHAR(100) NOT NULL
);

CREATE TABLE oferta (
    id_oferta        INT AUTO_INCREMENT PRIMARY KEY,
    tipo_descuento   VARCHAR(50) NOT NULL,
    valor            DECIMAL(10,2) NOT NULL,
    fecha_inicio     DATE NOT NULL,
    fecha_fin        DATE NOT NULL,
    estado           VARCHAR(50) NOT NULL DEFAULT 'activo'
);

-- Usuario y direcciones
CREATE TABLE usuario (
    id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    apellido        VARCHAR(100) NOT NULL,
    correo          VARCHAR(150) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    telefono        VARCHAR(20),
    tipo_usuario    VARCHAR(50),
    id_nivel        INT,
    estado          VARCHAR(50) NOT NULL DEFAULT 'activo',
    fecha_registro  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_rol          INT,
    CONSTRAINT fk_usuario_nivel FOREIGN KEY (id_nivel) REFERENCES nivel_fidelidad(id_nivel),
    CONSTRAINT fk_usuario_rol   FOREIGN KEY (id_rol)   REFERENCES rol(id_rol)
);

CREATE TABLE direccion (
    id_direccion     INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario       INT NOT NULL,
    calle            VARCHAR(200) NOT NULL,
    ciudad           VARCHAR(100) NOT NULL,
    departamento     VARCHAR(100),
    codigo_postal    VARCHAR(20),
    referencia       VARCHAR(200),
    principal        BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_direccion_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Producto y relacionados
CREATE TABLE producto (
    id_producto     INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria    INT NOT NULL,
    id_marca        INT NOT NULL,
    sku             VARCHAR(50) NOT NULL UNIQUE,
    nombre          VARCHAR(200) NOT NULL,
    descripcion     TEXT,
    precio          DECIMAL(10,2) NOT NULL,
    activo          BOOLEAN NOT NULL DEFAULT TRUE,
    peso            DECIMAL(10,2),
    fecha_registro  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    CONSTRAINT fk_producto_marca     FOREIGN KEY (id_marca)     REFERENCES marca(id_marca)
);

CREATE TABLE inventario (
    id_inventario   INT AUTO_INCREMENT PRIMARY KEY,
    id_producto     INT NOT NULL,
    stock_actual    INT NOT NULL DEFAULT 0,
    stock_minimo    INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_inventario_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE imagen_producto (
    id_img       INT AUTO_INCREMENT PRIMARY KEY,
    id_producto  INT NOT NULL,
    url          VARCHAR(500) NOT NULL,
    principal    BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_imagen_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE producto_keyword (
    id_producto  INT NOT NULL,
    id_keyword   INT NOT NULL,
    PRIMARY KEY (id_producto, id_keyword),
    CONSTRAINT fk_pk_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    CONSTRAINT fk_pk_keyword  FOREIGN KEY (id_keyword)  REFERENCES keyword(id_keyword)
);

CREATE TABLE producto_oferta (
    id_producto  INT NOT NULL,
    id_oferta    INT NOT NULL,
    PRIMARY KEY (id_producto, id_oferta),
    CONSTRAINT fk_po_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    CONSTRAINT fk_po_oferta   FOREIGN KEY (id_oferta)   REFERENCES oferta(id_oferta)
);

-- Carrito de compras
CREATE TABLE carrito (
    id_carrito          INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario          INT NOT NULL,
    id_estado_carrito   INT NOT NULL,
    fecha               DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carrito_usuario FOREIGN KEY (id_usuario)        REFERENCES usuario(id_usuario),
    CONSTRAINT fk_carrito_estado  FOREIGN KEY (id_estado_carrito) REFERENCES estado_carrito(id_estado_carrito)
);

CREATE TABLE carrito_detalle (
    id_detalle   INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito   INT NOT NULL,
    id_producto  INT NOT NULL,
    cantidad     INT NOT NULL DEFAULT 1,
    precio       DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_cdetalle_carrito  FOREIGN KEY (id_carrito)  REFERENCES carrito(id_carrito),
    CONSTRAINT fk_cdetalle_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- Pedido y relacionados
CREATE TABLE pedido (
    id_pedido          INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario         INT NOT NULL,
    id_direccion       INT NOT NULL,
    id_estado_pedido   INT NOT NULL,
    fecha              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal           DECIMAL(10,2) NOT NULL,
    impuesto           DECIMAL(10,2) NOT NULL,
    total              DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_pedido_usuario   FOREIGN KEY (id_usuario)       REFERENCES usuario(id_usuario),
    CONSTRAINT fk_pedido_direccion FOREIGN KEY (id_direccion)     REFERENCES direccion(id_direccion),
    CONSTRAINT fk_pedido_estado    FOREIGN KEY (id_estado_pedido) REFERENCES estado_pedido(id_estado_pedido)
);

CREATE TABLE pedido_detalle (
    id_detalle   INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido    INT NOT NULL,
    id_producto  INT NOT NULL,
    cantidad     INT NOT NULL DEFAULT 1,
    precio       DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_pdetalle_pedido   FOREIGN KEY (id_pedido)   REFERENCES pedido(id_pedido),
    CONSTRAINT fk_pdetalle_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE pago (
    id_pago          INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido        INT NOT NULL,
    id_metodo        INT NOT NULL,
    monto            DECIMAL(10,2) NOT NULL,
    fecha            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_estado_pago   INT NOT NULL,
    CONSTRAINT fk_pago_pedido FOREIGN KEY (id_pedido)      REFERENCES pedido(id_pedido),
    CONSTRAINT fk_pago_metodo FOREIGN KEY (id_metodo)      REFERENCES metodo_pago(id_metodo),
    CONSTRAINT fk_pago_estado FOREIGN KEY (id_estado_pago) REFERENCES estado_pago(id_estado_pago)
);

CREATE TABLE factura (
    id_factura  INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido   INT NOT NULL,
    numero      VARCHAR(50) NOT NULL UNIQUE,
    fecha       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_factura_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
);

CREATE TABLE garantia (
    id_garantia          INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido_detalle    INT NOT NULL,
    motivo               VARCHAR(500) NOT NULL,
    fecha_solicitud      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_estado_garantia   INT NOT NULL,
    CONSTRAINT fk_garantia_detalle FOREIGN KEY (id_pedido_detalle)  REFERENCES pedido_detalle(id_detalle),
    CONSTRAINT fk_garantia_estado  FOREIGN KEY (id_estado_garantia) REFERENCES estado_garantia(id_estado_garantia)
);



CREATE TABLE users {
    user_id varchar(30) NOT NULL,
    user_name varchar(30) NOT NULL,
    user_email: varchar(30) NOT NULL,
    user_cpf: bigint(12) NOT NULL,

    primary key (user_email, user_cpf)
}
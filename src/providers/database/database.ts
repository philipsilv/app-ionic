import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }
  // Cria o banco de dados
  public getDB(){
    return this.sqlite.create({
      name: 'entregas.db',
      location: 'default'
    });
  }


  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    //pega  banco
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
        // Inserindo dados padrão
        // this.insertDefaultItems(db);
      }).catch(e => console.log(e));
  }

    /**
    * Criando as tabelas no banco de dados
    * @param db
    */
    private createTables(db: SQLiteObject) {
      // Criando as tabelas
      db.executeSql('CREATE TABLE IF NOT EXISTS entregas (id integer primary key AUTOINCREMENT NOT NULL, nome varchar(50) NOT NULL, data_entrega date NOT NULL, hora_entrega time NULL, estado char(2) NOT NULL, cidade varchar(30) NOT NULL, cep varchar(10) NOT NULL, endereco varchar(100) NOT NULL, confirmada boolean NOT NULL default false, img varchar(50) NULL')
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
    }

  /**
  * Incluindo os dados padrões
  * @param db
  */
  // private insertDefaultItems(db: SQLiteObject) {
  //     db.executeSql('select COUNT(id) as qtd from estados', {})
  //     .then((data: any) => {
  //         //Se não existe nenhum registro
  //         if (data.rows.item(0).qtd == 0) {
  //         // Criando as tabelas
  //           db.sqlBatch([
  //               ['insert into estados (name) values (?)', ['Hambúrgueres']],
  //               ['insert into estados (name) values (?)', ['Bebidas']],
  //               ['insert into estados (name) values (?)', ['Sobremesas']]
  //           ])
  //           .then(() => console.log('Dados padrões incluídos'))
  //           .catch(e => console.error('Erro ao incluir dados padrões', e));
  //       }
  //   }).catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  //   }
}

 const db = require('./db.js')
 const pg = db.open({
     host: '127.0.0.1',
     port: 5432,
     user: 'postgres',
     password: 'belakt1',
     database: 'application'
 });
 // синтаксис через кваери билдер
 console.dir({ pg });
 //24 курсор у которого реализован метод зен
 // можно из курсора возвращать промис 
 //этот курсор можно присв в перем и передать или скланировать
 //эти операторы строят массив аргументов к ескюелю
 pg.select('pg_tables')
     .where({ tableowner: 'postgres', schemaname: 'public' })
     .fields(['schemaname', 'tablename', 'tableowner'])
     .then(rows => {
         console.table(rows);
         pg.close();
     });
 //  pg.select('pg_tables')
 //      .where({ tablename: 'systemuser' })
 //.value()
 //.row()
 //  .col('tablename')
 //  .then(array => {
 //      console.table(rows);
 //      pg.close();
 //  })
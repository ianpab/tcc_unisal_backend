import Knex from 'knex';

export async function seed(knex: Knex){
   await knex('items').insert([
        { title:'Mantas e cobertores', image: 'cobertor.svg'},
        { title:'Álcool e EPIs', image: 'alcool.svg'},
        { title:'Comida ou Cesta Básica', image: 'comida.svg'},
        { title:'Máscaras', image: 'mascara.svg'},
        { title:'Remédios', image: 'remedios.svg'},
        { title:'Roupas', image: 'roupas.svg'},

    ]);
}
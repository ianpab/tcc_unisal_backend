import { Response, Request} from 'express';
import knex from '../database/connection';

class PointController{

  async index(request: Request, response: Response){
    const { city, uf, items } = request.query; // QUERY porque eh filtro

    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item.trim()));

    const point = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');

  
    return response.json(point);

  }

  async create (request: Request, response: Response)  {
        const {
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          uf,
          city,
          items
        } = request.body;
             
        const trx = await knex.transaction();

         const point = await trx.insert({
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          uf,
          city
         },['id']).into('points');
        
      const point_id = point[0].id;
        const pointItems = items.map((item_id:number) => {
          return {
            item_id,
            point_id,
          };
        }); 
      
        await trx.insert(pointItems).into('point_items');
       await trx.commit();
        return response.json({
            id:pointItems,
            kk:point_id,
        });
      }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();
    if (!point){
      return response.status(400).json({message: 'Point not found!'});
    }

   
  
    const item = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id')
    .where('point_items.point_id', id)
    .select('items.title', 'items.id');

    return response.json({point, item});
  }

  async update (request: Request, response: Response)  {
    const { id } = request.params;

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    const trx = await knex.transaction();
    await trx('point_items').where('point_id',id).del();

    try{ 
    await trx('points').update({
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }).where('id',id);
  }catch{
   return response.json('Erro ao atualizar')
  }
    const point_id = id;
  
    const pointItems = items
    .map((item_id:number) => {
      return {
        item_id,
        point_id,
      };
    })
  
    await trx('point_items').insert(pointItems);

    await trx.commit();
    return response.json({
      id: point_id 
  }); // PARA FINALIZAR A TRANSACAO SE TUDO TIVER CERTO
  }


  async delete (request: Request, response: Response)  {
    const { id } = request.params;

    const trx = await knex.transaction();

    await trx('point_items').where('point_id',id).del();

    await trx('points').where('id',id).del();

    await trx.commit();
    return response.json({sucess:true});
  }

  
}

export default PointController;
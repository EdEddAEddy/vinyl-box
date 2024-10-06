import joi from "joi";

export const schemaArtistId = joi.object({
  artist_id: joi.number().required(),
});

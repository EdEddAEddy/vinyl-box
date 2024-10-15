import joi from "joi";

export const schemaSongId = joi.object({
  song_id: joi.number().required(),
});

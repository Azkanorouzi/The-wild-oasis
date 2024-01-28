import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}

export async function deleteCabins(id: string) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

// https://vggyeygmupiigrburwzz.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg so this is how we should do it

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = hasImagePath ? newCabin.image : `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // Create/edit
  let query = supabase.from('cabins')
  // 1. Create cabin
  const {data, error} = await query.select()
  if (!id) {
    query = await query
    .insert([{...newCabin, image: imagePath}])
    .single();
  }

  // B) EDIT
  if (id) {
    query = await query.update({...newCabin, image: imagePath})
    .eq('id', id)
    .select()
  }

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  // 2. Upload image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError)
      throw new Error("Cabin image could not be uploaded and the cabin was not created  ")
    }
  }
  return data;
}

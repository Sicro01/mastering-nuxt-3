const supabase = useSupabaseClient();

const user = ref(null)
const error = ref(null);

const getUser = async () => {
  try {
    const { data, error: getError } = await supabase.auth.getSession()
    if (getError) {
      console.log('Supabase getSession', getError);
      error.value = getError;
    };
    error.value = null;
    user.value = data.session?.user.user_metadata;
  }
  catch (err) {
    console.log('Unknown error getting user', err.message);
    error.value = error;
  }
  return { user, error };
}

export default getUser;
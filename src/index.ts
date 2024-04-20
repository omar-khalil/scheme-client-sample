import {create_fetchers} from 'scheme/src/create_fetchers';

const base_url = "http://localhost:4001";
const fetchers = create_fetchers(base_url);

const run_client: () => void = async () => {
  const post_result = await fetchers.post_user({name: 'Bob', age: 30, user_type: 'teacher'});
  const user = post_result.data;

  const get_result = await fetchers.get_user({user_id: user.user_id});
  switch (get_result.status) {
    case 200:
      const {age, name, user_type} = get_result.data;
      console.log(`Fetched ${name}, who is ${age} years old and a ${user_type}`);
      break;
    case 404:
      const {message} = get_result.data;
      console.log(`Failed to fetch due to error: ${message}`);
      break;
    default:
      const invalid: never = get_result;
      throw invalid;
  }
};

run_client();

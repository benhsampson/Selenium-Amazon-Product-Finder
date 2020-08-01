import {useIdentity} from '../lib/utils/withIdentity';

const Index = () => {
  const identity = useIdentity();
  if (!identity) {
    return 'no login detected';
  }
  return <h1>{JSON.stringify(identity)}</h1>;
};

export default Index;

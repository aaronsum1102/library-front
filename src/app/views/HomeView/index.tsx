import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Box, Button } from '@material-ui/core';

import { generateRouteUrl } from '~src/routes';
import { useAuth } from '~app/hooks';
import { Spacer, Spacings } from '~app/components';
import { ResourceFilters } from '~app/modules';

const HomeView = (): JSX.Element => {
  const { signOut } = useAuth();
  const history = useHistory();

  const onSingoutClick = async () => {
    await signOut();
    history.push(generateRouteUrl('login'));
  };

  return (
    <>
      <Typography variant="h4">Resources</Typography>
      <Spacer space={Spacings.xLarge} />
      <ResourceFilters />
      <Spacer space={Spacings.xLarge} />
      <Box>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut turpis a quam suscipit
        vestibulum. Aenean finibus, nunc at consectetur tempus, enim purus volutpat metus, id
        sagittis est orci eu ex. Integer ut tempor justo. Duis lobortis varius nibh, vel venenatis
        risus varius sit amet. Sed eget sollicitudin ligula. Nullam sit amet lorem nisl. Praesent
        dignissim orci sit amet libero rhoncus, ac viverra purus laoreet. Quisque sit amet dictum
        eros. Nullam maximus sit amet nibh nec accumsan. Sed a orci nisl. Mauris feugiat, nisi et
        finibus ultricies, leo leo placerat nibh, eget cursus tellus sapien vel sem. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent suscipit,
        orci sed varius fermentum, urna mauris rhoncus mi, ut sodales diam velit sit amet urna.
        Aenean rhoncus nunc justo, eu finibus ligula rhoncus eu. Aliquam id ex mi. Curabitur eget
        nunc sit amet libero mollis varius. Phasellus convallis massa sed sem ullamcorper rutrum.
        Praesent suscipit est at urna fermentum, ac mattis diam faucibus. Fusce molestie a nulla id
        bibendum. Vivamus euismod suscipit mi et fermentum. Quisque tempor iaculis justo, nec
        lobortis felis blandit quis. Maecenas id mauris eget purus tincidunt fermentum feugiat non
        nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras tincidunt sapien
        nec eros finibus tristique. Nulla molestie eget mauris nec accumsan. Phasellus mi dolor,
        pretium vel elit a, semper auctor nibh. Donec neque massa, tristique porttitor molestie sed,
        placerat ac ipsum. Donec tristique tristique diam, nec ornare metus ornare vitae. Curabitur
        vitae rhoncus elit. Aliquam erat volutpat. Donec et lacus dolor. Integer volutpat tempus
        lacinia. Nunc mattis turpis in velit semper, aliquet iaculis turpis consectetur. Quisque
        vulputate hendrerit enim, sed mattis ex mattis nec. Proin tempus, dui ac mollis tempus, est
        lacus ornare elit, id luctus eros metus non nisl. Sed in lacus condimentum, varius massa ac,
        condimentum ipsum. Quisque vitae nisl sit amet ipsum lobortis rutrum. In hac habitasse
        platea dictumst. In eget sodales ligula. Etiam pharetra neque vel laoreet venenatis. Aenean
        euismod, dolor in luctus vulputate, lorem lorem luctus orci, ut porta ligula arcu et nisi.
        Donec nisi nisl, feugiat eu felis quis, auctor varius ligula. In vestibulum lectus id risus
        rhoncus egestas. Nulla a congue risus. Donec fringilla enim in urna gravida, at tincidunt
        sem semper. Nam sit amet tincidunt massa. In ut malesuada eros. In mattis nisl nec nunc
        consequat lacinia. Nullam ac mauris quis massa viverra suscipit ut non dolor. Maecenas
        gravida malesuada risus ut finibus. Sed interdum, lectus a cursus interdum, mauris elit
        consectetur mi, vitae sollicitudin ante nibh at nulla.
        <Button onClick={() => onSingoutClick()}>Logout</Button>
      </Box>
    </>
  );
};

export default HomeView;

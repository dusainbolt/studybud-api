export type OAuth2Facebook = {
  // provider: 'facebook',
  provider: string;

  // id: '1363630274121334',
  id: string;

  // displayName: 'Lê Huy Du',
  displayName: string;

  // name: { familyName: 'Lê', givenName: 'Du', middleName: 'Huy' },
  name: {
    familyName: string;
    givenName: string;
    middleName: string;
  };

  // gender: '',
  gender: string;

  // emails: [{ value: "dulh181199@gmail.com" }];
  emails: { value: string }[];

  // url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1363630274121334&height=200&width=200&ext=1656300396&hash=AeR7XTVS9sf_piqWLHk";
  url: string;
};

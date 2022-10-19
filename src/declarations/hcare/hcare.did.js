export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  List.fill(IDL.Opt(IDL.Tuple(IDL.Text, List)));
  const Patient = IDL.Record({
    'aadharNo' : IDL.Text,
    'diseases' : List,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const PatientId = IDL.Nat32;
  return IDL.Service({
    'create' : IDL.Func([Patient], [PatientId], []),
    'delete' : IDL.Func([PatientId], [IDL.Bool], []),
    'read' : IDL.Func([PatientId], [IDL.Opt(Patient)], ['query']),
    'update' : IDL.Func([PatientId, Patient], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };

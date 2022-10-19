import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";

actor Patient{
    public type PatientId = Nat32;

    public type Patient = {
        firstName: Text;
        lastName: Text;
        aadharNo: Text;
        diseases: List.List<Text>;
    };

    private stable var next: PatientId = 1;
    private stable var patients: Trie.Trie<PatientId, Patient> = Trie.empty();

    public func create(patient : Patient) : async PatientId {
    let patientId = next;
    next += 1;
    patients := Trie.replace(
      patients,
      key(patientId),
      Nat32.equal,
      ?patient,
    ).0;
    return patientId;
  };

  public query func read(patientId : PatientId) : async ?Patient {
    let result = Trie.find(patients, key(patientId), Nat32.equal);
    return result;
  };


    public func update(patientId : PatientId, patient : Patient) : async Bool {
    let result = Trie.find(patients, key(patientId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      patients := Trie.replace(
        patients,
        key(patientId),
        Nat32.equal,
        ?patient,
      ).0;
    };
    return exists;
  };


  public func delete(patientId : PatientId) : async Bool {
    let result = Trie.find(patients, key(patientId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      patients := Trie.replace(
        patients,
        key(patientId),
        Nat32.equal,
        null,
      ).0;
    };
    return exists;
  };
  

  private func key(x : PatientId) : Trie.Key<PatientId> {
    return { hash = x; key = x };
  };
};
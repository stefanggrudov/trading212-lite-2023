import fs from "fs";

class CustomerFileRepository implements CustomerRepository {
  private customers: CustomerT[] = [];

  async init() {
    try
    {
      const rawCustomers = fs.readFileSync("./fake-db/customers-db.json", "utf-8");

      this.customers = JSON.parse(rawCustomers);

      console.log("Loaded customers", this.customers);

    }
    catch(err){
      console.log(err);
      this.customers = [];
    }
  }

  fetchAll(): Promise<CustomerT[]> {
    return Promise.resolve(this.customers);
  }
  findByEmail(email: string): Promise<CustomerT | undefined>{
    return Promise.resolve(this.customers.find((customer) => customer.email === email));
  }

  findById(id: string): Promise<CustomerT | undefined>{
    return Promise.resolve(this.customers.find((customer) => customer.id === id));
  }

  async add(newCustomer:CustomerT): Promise<CustomerT>{
    const customer = await(this.findById(newCustomer.id));
    if (customer) {
      throw new Error(`Existing customer ID ${customer.id}`);
    }

    this.customers.push(newCustomer);

    fs.writeFileSync("./fake-db/customers-db.json", JSON.stringify(this.customers))


    return newCustomer;
  }

  
}

export default new CustomerFileRepository();


interface CustomerRepository{
  init(): Promise<void>;

  fetchAll(): Promise<CustomerT[]>;

  findByEmail(email: string): Promise<CustomerT | undefined>;

  findById(id: string): Promise<CustomerT | undefined>;

  add(customer:CustomerT): Promise<CustomerT>;
}
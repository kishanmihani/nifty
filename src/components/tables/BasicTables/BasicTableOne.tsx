import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {  ChevronLeftIcon, TrashBinIcon } from "../../../icons";
import {  useEffect,useState } from "react";
import { authAxios } from "../../../utils/authAxios";
import Button from "../../ui/button/Button";

type orderItems = {
  first_name:string,
  last_name:string
  avatar:string,
  id:number,
  email:string
}
type dataItems = {
  page:number,
  total_pages:number,
  total:number,
  data:[],
  per_page:0
}
const TABLE_HEAD = ["Id", "email", "name", "avatar", "Delete"];
export default function BasicTableOne() {
    const [loading, setLoading] = useState(true);
  const [error, setError] =useState('');
  const [tabledata,setTabledata] = useState([])
  const [data, setData] =useState<dataItems>({
  page: 0,
  total_pages: 0,
  total: 0,
  data:[],
  per_page:0
});
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(()=>{
   authAxios.get('/api/users')
   .then((res)=>{setData(res.data);
    console.log(res.data)
    setTabledata(res.data.data)
        setLoading(false);})
   .catch((err)=>{
    setError(err.message);
        setLoading(false);
   })
  },[setLoading,setError,setData])
  function handeDelete(id:number){
    authAxios.delete(`/api/users/${id}`)
   .then((res)=>{
    // setData(res.data);
    console.log(res.data)
    // setTabledata(res.data.data)
        // setLoading(false);
        })
   .catch((err)=>{
    setError(err.message);
        setLoading(false);
   })
  }
  function handlePage(id:number){
    authAxios.get(`/api/users?page=${id}`)
   .then((res)=>{setData(res.data);
    console.log(res.data)
    setTabledata(res.data.data)
        setLoading(false);})
   .catch((err)=>{
    setError(err.message);
        setLoading(false);
   })
  }

  

const filteredData = tabledata.filter((user: orderItems) =>

  `${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div className="px-2 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
     <input
  type="text"
  placeholder="Search by email"
  value={searchTerm}
  onChange={(e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // filteredData()
  }}
  className="border px-3 py-2 rounded w-full max-w-sm mb-4"
/>
      {loading && <p>Loading . . .</p>}
        {error && <p>error {error}</p>} 
      <div className="max-w-full overflow-x-auto">
        {filteredData.length !== 0 && <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
               {TABLE_HEAD.map((head) => (
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                
                    {head}
              </TableCell>
               ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tabledata.filter((user: orderItems) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).map((order:orderItems) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.first_name} {order.last_name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900">
                        <img
                          width={30}
                          height={30}
                          src={order?.avatar}
                          alt={order?.avatar}
                          className="w-full size-6"
                        />
                      </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Button className="bg-white p-1 hover:bg-white" onClick={()=>handeDelete(order.id)}  ><TrashBinIcon style={{color:"red"}} width={16} height={16} /></Button>
                  
                </TableCell>
              </TableRow>
            ))}
            <TableRow >
                <TableCell >
                <div className="px-5 py-4 sm:px-6 text-start flex"><span className="block font-medium text-gray-500 text-theme-sm dark:text-white/90">
                        per page record :</span><span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{data.per_page}</span>
                        </div>
                </TableCell>
                <TableCell >
                <div className="px-5 py-4 sm:px-6 text-start flex"><span className="block font-medium text-gray-500 text-theme-sm dark:text-white/90">
                        total page :</span><span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{data.total_pages}</span>
                        </div>
                </TableCell>
              
                <TableCell >
                <div className="flex px-5 py-4 sm:px-6 text-start">
                  <span onClick={()=>handlePage(data?.page - 1)}className={`border border-gray-200 rounded-full m-auto text-gray-800 text-theme-sm dark:text-white/90 ${
    data?.page === 1 ? 'pointer-events-none opacity-50' : ''
  }`} ><ChevronLeftIcon  width={20} height={20} className="text-theme-sm" /></span> &nbsp;&nbsp;&nbsp;
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90" >{data.page}</span>&nbsp;&nbsp;&nbsp;
                <span onClick={()=>handlePage(data?.page + 1)} className={`border border-gray-200 rounded-full m-auto text-gray-800 text-theme-sm dark:text-white/90 ${
    data?.page === data?.total_pages ? 'pointer-events-none opacity-50' : ''
  }`}><ChevronLeftIcon width={20} height={20} className="text-theme-sm" style={{    transform: "rotateZ(182deg)"}} /></span>
                </div>
                </TableCell>
                <TableCell >
                
                <div className="px-5 py-4 sm:px-6 text-start flex"><span className="block font-medium text-gray-500 text-theme-sm dark:text-white/90">
                        total  record :</span><span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{data.total}</span>
                        </div>
                </TableCell>
            </TableRow>
          </TableBody>
          
        </Table>
}
      </div>
    </div>
  );
}

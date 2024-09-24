import './ListLoader.css';

const ListLoader = () => {
  return (
    <div className="w-fit h-fit flex items-end">
      <p className="text-cyan-200 font-bold text-lg tracking-wide mr-1 leading-none">
        Carregando lista
      </p>

      <span className="list-loader mb-[0.5px]" />
    </div>
  );
};

export default ListLoader;

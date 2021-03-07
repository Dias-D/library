<?php

namespace BusinessUnit\Repositories;

class BusinessUnit extends \AbstractRepository {

    public function getHierarchy()
    {
        $q = "
            SELECT
                bu.id business_unit_id,
                bu.name business_unit_name,
                c.id cell_id,
                c.name cell_name,
                f.id factory_id,
                f.name factory_name,
                pl.id production_line_id,
                pl.name production_line_name,
                m.id machine_id,
                m.name machine_name
            FROM
                business_unit bu
            INNER JOIN cell c
                ON c.business_unit_id = bu.id
            INNER JOIN factory f
                ON f.cell_id = c.id
            INNER JOIN production_line pl
                ON pl.factory_id = f.id
            INNER JOIN machine m
                ON m.production_line_id = pl.id
        ";

        $conn = \Database_Connection::instance()->connection();

        $stmt = $conn->prepare($q);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

}

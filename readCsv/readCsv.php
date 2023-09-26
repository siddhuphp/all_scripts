<style>
    table,
    th,
    td {
        border: 1px solid black;
    }
</style>

<?php

$CSVfp = fopen("medline.csv", "r");
if ($CSVfp !== FALSE) {
?>
    <div class="phppot-container">
        <table class="striped">
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>Class Level1</th>
                    <th>Class Level2</th>
                    <th>Product Family</th>
                    <th>Product Number</th>
                    <th>Product Description</th>
                    <th>Manufacturer</th>
                    <th>Manufacturer Product Number</th>
                    <th>Minimum Order Quantity</th>
                    <th>Multiple Order Quantity</th>
                    <th>List Price</th>
                    <th>HCPC</th>
                    <th>RXTYPE</th>
                    <th>Most Popular</th>
                    <th>Focus 600</th>
                    <th>Latex Free</th>
                    <th>Base UoM</th>
                    <th>Sales UoM</th>
                    <th>Case Packaging</th>
                    <th>HCPC Documents</th>
                    <th>HRE Documents</th>
                    <th>LRE Documents</th>
                    <th>MSD Sheets</th>
                    <th>Marketing Documents</th>
                    <th>Primary Documents</th>
                    <th>Videos</th>
                    <th>Detailed Product Description</th>
                    <th>Product Web Description</th>
                    <th>Corp Designation</th>
                    <th>Product Division</th>
                    <th>Substitute Material 1</th>
                    <th>Substitution Code 1</th>
                    <th>Substitute Material 2</th>
                    <th>Substitution Code 2</th>
                    <th>Substitute Material 3</th>
                    <th>Substitution Code 3</th>
                    <th>EAN/UPC Code</th>
                    <th>EAN Category</th>
                    <th>Dimensions</th>
                    <th>Gross Weight</th>
                    <th>Unit Weight</th>
                    <th>Parent Material</th>
                </tr>
            </thead>
            <?php
            $i = 1;
            while (!feof($CSVfp)) {
                $data = fgetcsv($CSVfp, 1000, "|");
                if (!empty($data)) {
            ?>
                    <tr class="data">
                        <td><?php echo $i++; ?></td>
                        <td><?php echo $data[0]; ?></td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[1]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[2]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[3]; ?>[3]</div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[4]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[5]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[6]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[7]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[8]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[9]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[10]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[11]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[12]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[13]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[14]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[15]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[16]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[17]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[18]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[19]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[20]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[21]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[22]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[23]; ?>[23]</div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[24]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[25]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[26]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[27]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[28]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[29]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[30]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[31]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[32]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[33]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[34]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[35]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[36]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[37]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[38]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[39]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[40]; ?></div>
                        </td>
                        <td>
                            <div class="property-display" style="background-color: white;"><?php echo $data[41]; ?></div>
                        </td>
                    </tr>
                <?php } ?>
            <?php
			//if($i==300){ exit;}
            }
            ?>
        </table>
    </div>
<?php
}
fclose($CSVfp);
?>
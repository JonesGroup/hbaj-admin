<template>
    <div class="main mgT24">
        <div
            style="display: flex;
    justify-content: space-between;"
        >
            <div style="margin-bottom:24px">
                <el-radio-group v-model="blockId" @change="handleShipType">
                    <el-radio-button :label="25" type="primary">
                        散货船
                    </el-radio-button>
                    <el-radio-button :label="24" type="primary">
                        豪华邮轮
                    </el-radio-button>
                    <el-radio-button :label="27" type="primary">
                        CIC专项船
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div>
                <el-button type="primary">新增</el-button>
            </div>
        </div>

        <div>
            <el-form ref="form" :model="form" label-width="80px" inline label-position="left">
                <el-form-item label="功能">
                    <el-select v-model="form.moduleId" placeholder="请选择" @change="changeFun">
                        <el-option :label="item.name" :value="item.id" v-for="item in funcList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目分类">
                    <el-select v-model="form.classId" placeholder="请选择" @change="changeClass">
                        <el-option :label="item.name" :value="item.id" v-for="item in moduleList" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择" @change="getList">
                        <el-option :label="item.label" :value="item.value" v-for="item in statusList" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" v-loading="loading">
            <el-table-column prop="id" label="序号" />
            <el-table-column prop="name" label="项目名称" />
            <el-table-column prop="detail" label="项目详情" />
            <el-table-column label="发布时间">
                <template slot-scope="{ row }">
                    <span>{{ row.publishDate | formaData }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="{ row }">
                    <span>{{ transformText(row.status) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否公开">
                <template slot-scope="{ row }">
                    <span>{{ row.publicFlg === 1 ? "公开" : "非公开" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="{ row }">
                    <el-button type="text" v-if="[1, 2, 5].indexOf(row.status) !== -1" @click="handler(row.id, 'patch', 'onshelf')">
                        发布
                    </el-button>
                    <el-button type="text" v-if="[3].indexOf(row.status) !== -1" @click="handler(row.id, 'patch', 'offshelf')">
                        下架
                    </el-button>
                    <el-button type="text" v-if="[2].indexOf(row.status) !== -1" @click="handler(row.id, 'patch', 'verify')">
                        审核撤回
                    </el-button>
                    <el-button type="text" v-if="row.publicFlg !== 1" @click="handler(row.id, 'patch', 'public')">
                        公开
                    </el-button>
                    <el-button type="text" v-if="row.publicFlg === 1" @click="handler(row.id, 'patch', 'unpublic')">
                        取消公开
                    </el-button>
                    <el-button type="text" @click="toDetail(row.id)">
                        查看
                    </el-button>
                    <el-button type="text">
                        编辑
                    </el-button>
                    <el-button type="text" v-if="[0].indexOf(row.status) !== -1" @click="dispathTask(row)">
                        下发任务
                    </el-button>
                    <el-button type="text" v-if="[0].indexOf(row.status) !== -1" @click="del(row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <app-pagination
            @size-change="setPagination('page_size', $event)"
            @current-change="setPagination('page', $event)"
            :current-page="pagination.page"
            :page-sizes="[10, 20, 50]"
            :page-size="pagination.page_size"
            :total="pagination.total"
        />
    </div>
</template>

<script>
import { project, projectDetail, projectModule, projectClass } from "@/model/api";
export default {
    data() {
        return {
            pagination: {
                page: 1,
                page_size: 10,
                total: 0
            },
            tableData: [],
            loading: false,
            form: {
                moduleId: "",
                classId: "",
                status: ""
            },
            blockId: 25,
            moduleList: [],
            funcList: [],
            statusList: [
                {
                    label: "创建中",
                    value: 0
                },
                {
                    label: "编辑中",
                    value: 1
                },
                {
                    label: "待审核",
                    value: 2
                },
                {
                    label: "上架",
                    value: 3
                },
                {
                    label: "审核不通过",
                    value: 4
                },
                {
                    label: "下架",
                    value: 5
                }
            ]
        };
    },
    methods: {
        transformText(status) {
            if (!status) {
                return status;
            }
            const map = {
                0: "创建中",
                1: "编辑中",
                2: "待审核",
                3: "上架",
                4: "审核不通过",
                5: "下架"
            };
            return map[status];
        },
        getList() {
            this.loading = true;
            const { page, page_size } = this.pagination;
            project({
                type: "GET",
                data: {
                    page: page,
                    size: page_size,
                    blockId: this.blockId,
                    moduleId: this.form.moduleId,
                    classId: this.form.classId,
                    status: this.form.status
                }
            }).then(res => {
                if (res.suceeded) {
                    this.loading = false;
                    const { content, total, currentPage, pageSize } = res.data;
                    this.pagination.total = total;
                    this.pagination.page = currentPage;
                    this.pagination.page_size = pageSize;
                    this.tableData = content;
                }
            });
        },
        setPagination(p, v) {
            this.$set(this.pagination, p, v);
            this.getList();
        },
        toDetail(id) {
            this.$router.push(`./courseDetail/${id}`);
        },
        handler(id, type, url) {
            projectDetail(
                {
                    type
                },
                `${id}/${url}`
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                } else {
                    this.$message.error("操作失败");
                }
            });
        },
        del(id) {
            projectDetail(
                {
                    type: "delete"
                },
                id
            ).then(res => {
                if (res.suceeded) {
                    this.$message.success("操作成功");
                    this.getList();
                } else {
                    this.$message.error("操作失败");
                }
            });
        },
        dispathTask(data) {
            console.log(data, "下发任务");
        },
        handleShipType() {
            this.getFunList();
            this.getList();
            this.form.moduleId = "";
            this.form.classId = "";
        },
        changeFun() {
            this.getClassList();
            this.form.classId = "";
            this.getList();
        },
        changeClass() {
            this.getList();
        },
        getFunList() {
            // 获取功能列表
            projectModule({
                type: "get",
                data: {
                    blockId: this.blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.funcList = res.data || [];
                }
            });
        },
        getClassList() {
            projectClass({
                type: "get",
                data: {
                    moduleId: this.form.moduleId,
                    blockId: this.blockId
                }
            }).then(res => {
                if (res.suceeded) {
                    this.moduleList = res.data.content || [];
                }
            });
        }
    },
    created() {
        this.getFunList();
        this.getList();
    }
};
</script>

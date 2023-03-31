export type TreeLikeNode<F extends string | number | symbol> = {
  [K in F]?: Array<TreeLikeNode<F>>;
} & { [x: string]: any };

type FlattenTreeOpts = {
  children?: string | ((TreeLike) => TreeLike[]);
  filter?: (node: TreeLike) => boolean;
};

type TreeLike = TreeLikeNode<'children' | 'Children'>;

/**
 * @description 扁平化树结构
 * @param target
 * @param options
 * @param rank
 * @param parents
 * @param result
 * @param rankIndex
 * @returns
 */
export function flattenTree(
  target: TreeLike,
  options: FlattenTreeOpts = {},
  rank: number = 0,
  parents: Array<TreeLike> = [],
  result: Array<TreeLike> = [],
  rankIndex = {}
): TreeLike[] {
  const { children = 'children', filter } = options;
  if (filter && filter(target)) {
    result.push({
      data: target,
      parents,
      rank,
      rankIndex: getRankIndex(rank, rankIndex),
    });
  } else {
    result.push({
      data: target,
      rank,
      parents,
      rankIndex: getRankIndex(rank, rankIndex),
    });
  }

  const childrenArray: TreeLike[] =
    typeof children === 'function' ? children(target) : target[children];

  if (Array.isArray(childrenArray) && childrenArray.length > 0) {
    //叶子节点
    childrenArray.forEach((child) => {
      flattenTree(child, options, rank + 1, [...parents, target], result, rankIndex);
    });
  } else {
    //根节点
    result[result.length - 1].lastRank = true;
  }
  return result;
}

type TreeFromArrayOpts = {
  key?: string; //确定唯一节点的key字段
  childrenFiled?: string; //存储子节点ID的字段
};
/**
 * @description 根据树的扁平化数组，生成新的树
 * @param  root 开始查找的根节点
 * @param  nodeArr 包含所有节点的数组
 * @param  options 其它选项
 * @returns
 */
export function getTreeFromFlattenArray(
  root: TreeLike,
  nodeArr: TreeLike[],
  options: TreeFromArrayOpts = {}
): TreeLike {
  const uniqKey = options.key || 'id';
  const childrenIdFiled = options.childrenFiled || 'children';
  const children: TreeLike[] = root[childrenIdFiled] || [];
  return {
    ...root,
    [childrenIdFiled]: children
      .map((id) => nodeArr.find((node) => node[uniqKey] === id))
      .map((child) => {
        if (child) {
          getTreeFromFlattenArray(child, nodeArr, options);
        }
      }),
  };
}

/**
 * 获取具有最大节点数的rank
 * @param rootNode
 * @param options
 * @returns  [rank,rankNumber]
 */

export function getTreeRankWithMaxNode(rootNode: TreeLike, options: FlattenTreeOpts) {
  const flattenArray = flattenTree(rootNode, options);
  const rankTotals: Record<number | string, number> = flattenArray.reduce((pre, curr) => {
    const rank: number = curr.rank;
    return {
      ...pre,
      [rank]: pre[rank] ? pre[rank] + 1 : 1,
    };
  }, {});
  const entries = Object.entries(rankTotals);
  return entries.reduce(
    (pre, curr) => {
      if (curr[1] >= pre[1]) {
        return curr;
      } else {
        return pre;
      }
    },
    ['0', 0]
  );
}

/**
 * 统计tree每层的节点数；
 * @param  rootNode
 * @param  options
 * @returns rank节点数量统计结果
 */
export function getTreeRankNodesNumber(
  rootNode: TreeLike,
  options: FlattenTreeOpts
): Record<number, number> {
  const flattenArray = flattenTree(rootNode, options);
  return flattenArray.reduce((pre, curr) => {
    const rank: number = curr.rank;
    return {
      ...pre,
      [rank]: pre[rank] ? pre[rank] + 1 : 1,
    };
  }, {});
}

/**
 * @description 统计一个数组中所有元素某一个字段的值的分布
 * @param array 待统计数组
 * @param filed 待统计字段
 * @returns 返回所求field所有值的数量分布
 */
export function statisticArrayBy(array: Record<any, any>[], filed: string) {
  return array.reduce((pre, curr) => {
    const rankValue: string | number = curr[filed];
    return {
      ...pre,
      [rankValue]: pre[rankValue] ? pre[rankValue].concat(curr) : [curr],
    };
  }, {});
}

/**
 * @description
 * @param rank 当前节点的rank层级
 * @param rankRecord 已遍历节点的rank记录
 * @returns 当前rank层级的索引排序
 */

function getRankIndex(rank: number, rankRecord: Record<number, number[]>) {
  if (rankRecord[rank]) {
    rankRecord[rank].push(1);
    return rankRecord[rank].length - 1;
  } else {
    rankRecord[rank] = [1];
    return 0;
  }
}
